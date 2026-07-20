import Vehicle from "../models/vehicle.model.js";

export const createVehicle = async (req, res) => {
    try {
        const { userId, vehicleNumber, vehicleType, brand, model, color } = req.body;
        if (!userId || !vehicleNumber || !vehicleType || !brand || !model) {
            return res.status(400).json({ success: false, message: "All required fields must be provided." });
        }
        const existingVehicle = await Vehicle.findOne({ vehicleNumber });
        if (existingVehicle) {
            return res.status(400).json({ success: false, message: "Vehicle already exists." });
        }
        const vehicle = await Vehicle.create({
            userId, vehicleNumber, vehicleType, brand, model, color,
        });
        res.status(201).json({ success: true, message: "Vehicle added successfully.", vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({ success: true, count: vehicles.length, vehicles, });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findOne({ id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found." });
        }
        res.status(200).json({ success: true, vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getVehiclesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const vehicles = await Vehicle.find({ userId });
        res.status(200).json({ success: true, count: vehicles.length, vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicleNumber, vehicleType, brand, model, color } = req.body;
        const vehicle = await Vehicle.findOne({ id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found." });
        }
        if (vehicleNumber !== undefined) vehicle.vehicleNumber = vehicleNumber;
        if (vehicleType !== undefined) vehicle.vehicleType = vehicleType;
        if (brand !== undefined) vehicle.brand = brand;
        if (model !== undefined) vehicle.model = model;
        if (color !== undefined) vehicle.color = color;
        await vehicle.save();

        res.status(200).json({ success: true, message: "Vehicle updated successfully.", vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findOneAndDelete({ id });
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found." });
        }
        res.status(200).json({ success: true, message: "Vehicle deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};