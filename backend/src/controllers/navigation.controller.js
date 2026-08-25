import ParkingArea from "../models/parkingArea.model.js";
import ParkingSlot from "../models/parkingSlot.model.js";
import {
  calculateDistance,
  estimateDrivingDuration,
  generateNavigationUrls,
} from "../utils/distance.util.js";

/**
 * Get nearby parking areas with distance calculation and navigation links
 * GET /api/navigation/nearby?latitude=19.0760&longitude=72.8777&radius=15&sortBy=distance
 */
export const getNearbyParkingAreas = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radius = 15, // Max distance in kilometers (default 15 km)
      sortBy = "distance", // "distance" | "price" | "availableSlots"
      vehicleType,
      limit = 20,
    } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "User coordinates (latitude and longitude) are required.",
      });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    const maxRadiusKm = parseFloat(radius);

    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be valid floating numbers.",
      });
    }

    // Fetch active parking areas
    const parkingAreas = await ParkingArea.find({ isActive: true }).lean();

    if (!parkingAreas || parkingAreas.length === 0) {
      return res.status(200).json({
        success: true,
        userLocation: { latitude: userLat, longitude: userLng },
        count: 0,
        data: [],
      });
    }

    // Calculate distance and navigation for each parking area
    let nearbyAreas = parkingAreas
      .map((area) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          area.latitude,
          area.longitude
        );

        const estimatedDuration = estimateDrivingDuration(distance.km);

        const navigation = generateNavigationUrls(
          userLat,
          userLng,
          area.latitude,
          area.longitude,
          area.name
        );

        return {
          ...area,
          distance,
          estimatedDuration,
          navigation,
        };
      })
      .filter((area) => area.distance.km <= maxRadiusKm);

    // Filter by vehicle type if requested
    if (vehicleType) {
      const availableSlotAreas = await ParkingSlot.find({
        vehicleType,
        status: "Available",
        isActive: true,
      }).distinct("parkingAreaId");

      nearbyAreas = nearbyAreas.filter((area) =>
        availableSlotAreas.includes(area.id)
      );
    }

    // Sorting
    if (sortBy === "price") {
      nearbyAreas.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === "availableSlots") {
      nearbyAreas.sort((a, b) => b.availableSlots - a.availableSlots);
    } else {
      // Default: sort by closest distance first
      nearbyAreas.sort((a, b) => a.distance.km - b.distance.km);
    }

    // Apply limit
    const limitedAreas = nearbyAreas.slice(0, parseInt(limit, 10));

    return res.status(200).json({
      success: true,
      userLocation: {
        latitude: userLat,
        longitude: userLng,
      },
      count: limitedAreas.length,
      radiusKm: maxRadiusKm,
      data: limitedAreas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get detailed directions and Google Maps routing to a specific parking area
 * GET /api/navigation/directions/:parkingAreaId?latitude=19.0760&longitude=72.8777
 */
export const getDirectionsToParkingArea = async (req, res) => {
  try {
    const { parkingAreaId } = req.params;
    const { latitude, longitude, userLatitude, userLongitude } = req.query;

    const userLat = parseFloat(latitude || userLatitude);
    const userLng = parseFloat(longitude || userLongitude);

    const parkingArea = await ParkingArea.findOne({
      $or: [{ id: parkingAreaId }, { _id: parkingAreaId.match(/^[0-9a-fA-F]{24}$/) ? parkingAreaId : null }],
    }).lean();

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    let routeDetails = null;

    if (!isNaN(userLat) && !isNaN(userLng)) {
      const distance = calculateDistance(
        userLat,
        userLng,
        parkingArea.latitude,
        parkingArea.longitude
      );

      const estimatedDuration = estimateDrivingDuration(distance.km);

      const navigation = generateNavigationUrls(
        userLat,
        userLng,
        parkingArea.latitude,
        parkingArea.longitude,
        parkingArea.name
      );

      routeDetails = {
        origin: { latitude: userLat, longitude: userLng },
        destination: {
          latitude: parkingArea.latitude,
          longitude: parkingArea.longitude,
          name: parkingArea.name,
          address: parkingArea.address,
        },
        distance,
        estimatedDuration,
        navigation,
      };
    } else {
      // Return destination map links even without origin
      routeDetails = {
        destination: {
          latitude: parkingArea.latitude,
          longitude: parkingArea.longitude,
          name: parkingArea.name,
          address: parkingArea.address,
        },
        navigation: {
          googleMapsPinUrl: `https://www.google.com/maps/search/?api=1&query=${parkingArea.latitude},${parkingArea.longitude}`,
          embedMapUrl: `https://maps.google.com/maps?q=${parkingArea.latitude},${parkingArea.longitude}&z=15&output=embed`,
          wazeUrl: `https://waze.com/ul?ll=${parkingArea.latitude},${parkingArea.longitude}&navigate=yes`,
        },
      };
    }

    return res.status(200).json({
      success: true,
      parkingArea,
      route: routeDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get map pin information and embed URL for a parking area
 * GET /api/navigation/pin/:parkingAreaId
 */
export const getParkingAreaMapPin = async (req, res) => {
  try {
    const { parkingAreaId } = req.params;

    const parkingArea = await ParkingArea.findOne({
      $or: [{ id: parkingAreaId }, { _id: parkingAreaId.match(/^[0-9a-fA-F]{24}$/) ? parkingAreaId : null }],
    });

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const navigation = {
      coordinates: {
        latitude: parkingArea.latitude,
        longitude: parkingArea.longitude,
      },
      googleMapsPinUrl: `https://www.google.com/maps/search/?api=1&query=${parkingArea.latitude},${parkingArea.longitude}+(${encodeURIComponent(parkingArea.name)})`,
      embedMapUrl: `https://maps.google.com/maps?q=${parkingArea.latitude},${parkingArea.longitude}&z=15&output=embed`,
      wazeUrl: `https://waze.com/ul?ll=${parkingArea.latitude},${parkingArea.longitude}&navigate=yes`,
    };

    return res.status(200).json({
      success: true,
      parkingAreaId: parkingArea.id,
      name: parkingArea.name,
      address: parkingArea.address,
      navigation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
