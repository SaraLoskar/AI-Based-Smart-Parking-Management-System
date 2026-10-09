// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";

// export default function ProfileScreen() {

//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress: logout,
//         },
//       ]
//     );
//   };

//   const menu = [
//     {
//       title: "My Vehicles",
//       icon: "car-outline",
//     },
//     {
//       title: "Payment Methods",
//       icon: "card-outline",
//     },
//     {
//       title: "Notifications",
//       icon: "notifications-outline",
//     },
//     {
//       title: "Help & Support",
//       icon: "help-circle-outline",
//     },
//     {
//       title: "Settings",
//       icon: "settings-outline",
//     },
//   ];

//   return (

//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.content}
//       showsVerticalScrollIndicator={false}
//     >

//       <View style={styles.profileBox}>

//         <View style={styles.avatar}>
//           <Ionicons
//             name="person"
//             size={60}
//             color="#118A54"
//           />
//         </View>

//         <Text style={styles.name}>
//           {user?.fullName || "User"}
//         </Text>

//         <Text style={styles.email}>
//           {user?.email}
//         </Text>

//       </View>

//       {menu.map((item) => (

//         <TouchableOpacity
//           key={item.title}
//           style={styles.menuItem}
//         >

//           <Ionicons
//             name={item.icon}
//             size={24}
//             color="#118A54"
//           />

//           <Text style={styles.menuText}>
//             {item.title}
//           </Text>

//           <Ionicons
//             name="chevron-forward"
//             size={22}
//             color="#999"
//           />

//         </TouchableOpacity>

//       ))}

//       <TouchableOpacity
//         style={styles.logout}
//         onPress={handleLogout}
//       >

//         <Ionicons
//           name="log-out-outline"
//           size={24}
//           color="#fff"
//         />

//         <Text style={styles.logoutText}>
//           Logout
//         </Text>

//       </TouchableOpacity>

//     </ScrollView>

//   );

// }

// const styles = StyleSheet.create({

// container:{
// flex:1,
// backgroundColor:"#FAFBF8",
// },

// content:{
// paddingHorizontal:20,
// paddingTop:20,
// paddingBottom:130,
// },

// profileBox:{
// alignItems:"center",
// marginBottom:35,
// },

// avatar:{
// height:110,
// width:110,
// borderRadius:55,
// backgroundColor:"#EAF9F1",
// justifyContent:"center",
// alignItems:"center",
// marginBottom:15,
// },

// name:{
// fontSize:24,
// fontWeight:"700",
// },

// email:{
// marginTop:6,
// fontSize:16,
// color:"#666",
// },

// menuItem:{
// flexDirection:"row",
// alignItems:"center",
// backgroundColor:"#fff",
// padding:18,
// borderRadius:18,
// marginBottom:15,

// shadowColor:"#000",
// shadowOpacity:0.05,
// shadowRadius:5,
// shadowOffset:{
// width:0,
// height:2,
// },
// elevation:2,
// },

// menuText:{
// flex:1,
// marginLeft:18,
// fontSize:17,
// fontWeight:"600",
// },

// logout:{
// marginTop:20,
// height:58,
// borderRadius:18,
// backgroundColor:"#E53935",
// justifyContent:"center",
// alignItems:"center",
// flexDirection:"row",

// marginBottom:30,
// },

// logoutText:{
// marginLeft:10,
// fontSize:18,
// fontWeight:"700",
// color:"#fff",
// },

// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
  Switch,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const GREEN = "#118A54";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [name, setName] = useState(
    user?.fullName || user?.name || "User"
  );
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [modal, setModal] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [offersNotifications, setOffersNotifications] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");

  const [paymentMethods, setPaymentMethods] = useState([
    { id: "upi", name: "UPI", icon: "phone-portrait-outline" },
    { id: "card", name: "Credit / Debit Card", icon: "card-outline" },
    { id: "cash", name: "Pay at Parking", icon: "cash-outline" },
  ]);
  const [preferredPayment, setPreferredPayment] = useState("upi");
  const [supportMessage, setSupportMessage] = useState("");

  const bg = darkMode ? "#111827" : "#FAFBF8";
  const card = darkMode ? "#1F2937" : "#FFFFFF";
  const text = darkMode ? "#F9FAFB" : "#17211B";
  const muted = darkMode ? "#D1D5DB" : "#666666";
  const border = darkMode ? "#374151" : "#E5E7EB";

  const closeModal = () => setModal("");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const saveProfile = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }

    setName(name.trim());
    setEmail(email.trim());
    setPhone(phone.trim());
    closeModal();
    Alert.alert(
      "Profile updated",
      "Your changes are updated on this screen."
    );
  };

  const addVehicle = () => {
    if (!vehicleName.trim() || !vehicleNumber.trim()) {
      Alert.alert(
        "Missing details",
        "Please enter a vehicle name and registration number."
      );
      return;
    }

    const newVehicle = {
      id: `${Date.now()}`,
      name: vehicleName.trim(),
      number: vehicleNumber.trim().toUpperCase(),
      type: vehicleType,
    };

    setVehicles((previous) => [...previous, newVehicle]);
    setVehicleName("");
    setVehicleNumber("");
    setVehicleType("Car");
    closeModal();
  };

  const removeVehicle = (id) => {
    Alert.alert("Remove vehicle", "Do you want to remove this vehicle?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setVehicles((previous) =>
            previous.filter((vehicle) => vehicle.id !== id)
          ),
      },
    ]);
  };

  const selectPayment = (id) => {
    setPreferredPayment(id);
    Alert.alert(
      "Payment preference updated",
      "Your preferred demo payment method has been changed."
    );
  };

  const submitSupport = () => {
    if (!supportMessage.trim()) {
      Alert.alert("Enter a message", "Please describe your issue first.");
      return;
    }

    // Demo only: this does not send the message to a server.
    Alert.alert(
      "Message prepared",
      "Your support message is ready, but has not been sent. Connect a support API to submit it."
    );
    setSupportMessage("");
    closeModal();
  };

  const menu = [
    { title: "Edit Profile", subtitle: "Name, email and phone", icon: "person-outline", action: () => setModal("edit") },
    { title: "My Vehicles", subtitle: `${vehicles.length} saved`, icon: "car-outline", action: () => setModal("vehicles") },
    { title: "Payment Methods", subtitle: "Choose a preferred method", icon: "card-outline", action: () => setModal("payments") },
    { title: "Notifications", subtitle: "Manage your alerts", icon: "notifications-outline", action: () => setModal("notifications") },
    { title: "Help & Support", subtitle: "Get assistance", icon: "help-circle-outline", action: () => setModal("support") },
    { title: "Settings", subtitle: "Appearance and preferences", icon: "settings-outline", action: () => setModal("settings") },
  ];

  const renderModal = () => (
    <Modal
      visible={Boolean(modal)}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: text }]}>
              {{
                edit: "Edit Profile",
                vehicles: "My Vehicles",
                addVehicle: "Add Vehicle",
                payments: "Payment Methods",
                notifications: "Notifications",
                support: "Help & Support",
                settings: "Settings",
              }[modal] || "SmartSpot"}
            </Text>

            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={26} color={text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {modal === "edit" && (
              <>
                <Text style={[styles.fieldLabel, { color: muted }]}>Full name</Text>
                <TextInput
                  style={[styles.input, { color: text, borderColor: border }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={muted}
                />

                <Text style={[styles.fieldLabel, { color: muted }]}>Email</Text>
                <TextInput
                  style={[styles.input, { color: text, borderColor: border }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  placeholderTextColor={muted}
                />

                <Text style={[styles.fieldLabel, { color: muted }]}>Phone</Text>
                <TextInput
                  style={[styles.input, { color: text, borderColor: border }]}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="Enter your phone number"
                  placeholderTextColor={muted}
                />

                <TouchableOpacity style={styles.primaryButton} onPress={saveProfile}>
                  <Text style={styles.primaryButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "vehicles" && (
              <>
                {vehicles.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="car-outline" size={42} color={GREEN} />
                    <Text style={[styles.emptyTitle, { color: text }]}>No vehicles yet</Text>
                    <Text style={{ color: muted, textAlign: "center" }}>
                      Add your car, bike or EV for easier parking management.
                    </Text>
                  </View>
                ) : (
                  vehicles.map((vehicle) => (
                    <View key={vehicle.id} style={[styles.vehicleCard, { borderColor: border }]}>
                      <Ionicons
                        name={vehicle.type === "Bike" ? "bicycle-outline" : "car-outline"}
                        size={28}
                        color={GREEN}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={[styles.itemTitle, { color: text }]}>
                          {vehicle.name} · {vehicle.type}
                        </Text>
                        <Text style={{ color: muted }}>{vehicle.number}</Text>
                      </View>
                      <TouchableOpacity onPress={() => removeVehicle(vehicle.id)}>
                        <Ionicons name="trash-outline" size={22} color="#E53935" />
                      </TouchableOpacity>
                    </View>
                  ))
                )}

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => setModal("addVehicle")}
                >
                  <Text style={styles.primaryButtonText}>+ Add Vehicle</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "addVehicle" && (
              <>
                <Text style={[styles.fieldLabel, { color: muted }]}>Vehicle name</Text>
                <TextInput
                  style={[styles.input, { color: text, borderColor: border }]}
                  value={vehicleName}
                  onChangeText={setVehicleName}
                  placeholder="e.g. Honda City"
                  placeholderTextColor={muted}
                />

                <Text style={[styles.fieldLabel, { color: muted }]}>Registration number</Text>
                <TextInput
                  style={[styles.input, { color: text, borderColor: border }]}
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                  autoCapitalize="characters"
                  placeholder="e.g. MH01AB1234"
                  placeholderTextColor={muted}
                />

                <Text style={[styles.fieldLabel, { color: muted }]}>Vehicle type</Text>
                <View style={styles.typeRow}>
                  {["Car", "Bike", "EV"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setVehicleType(type)}
                      style={[
                        styles.typeOption,
                        {
                          backgroundColor: vehicleType === type ? GREEN : card,
                          borderColor: vehicleType === type ? GREEN : border,
                        },
                      ]}
                    >
                      <Text style={{ color: vehicleType === type ? "#fff" : text }}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={addVehicle}>
                  <Text style={styles.primaryButtonText}>Save Vehicle</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "payments" && (
              <>
                <Text style={[styles.helperText, { color: muted }]}>
                  Select your preferred demo payment method.
                </Text>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    onPress={() => selectPayment(method.id)}
                    style={[styles.optionRow, { borderColor: border }]}
                  >
                    <Ionicons name={method.icon} size={25} color={GREEN} />
                    <Text style={[styles.itemTitle, { color: text, flex: 1, marginLeft: 12 }]}>
                      {method.name}
                    </Text>
                    <Ionicons
                      name={preferredPayment === method.id ? "radio-button-on" : "radio-button-off"}
                      size={22}
                      color={preferredPayment === method.id ? GREEN : muted}
                    />
                  </TouchableOpacity>
                ))}
                <Text style={[styles.helperText, { color: muted }]}>
                  No real card or bank details are collected here.
                </Text>
              </>
            )}

            {modal === "notifications" && (
              <>
                {[
                  ["Push notifications", pushNotifications, setPushNotifications],
                  ["Booking updates", bookingNotifications, setBookingNotifications],
                  ["Offers and promotions", offersNotifications, setOffersNotifications],
                ].map(([label, value, setter]) => (
                  <View key={label} style={[styles.optionRow, { borderColor: border }]}>
                    <Text style={[styles.itemTitle, { color: text, flex: 1 }]}>
                      {label}
                    </Text>
                    <Switch
                      value={value}
                      onValueChange={setter}
                      trackColor={{ false: "#9CA3AF", true: "#8BD5B0" }}
                      thumbColor={value ? GREEN : "#F9FAFB"}
                    />
                  </View>
                ))}
                <Text style={[styles.helperText, { color: muted }]}>
                  These settings control this screen only. Device notifications
                  require notification permissions and integration.
                </Text>
              </>
            )}

            {modal === "support" && (
              <>
                <View style={styles.supportInfo}>
                  <Ionicons name="mail-outline" size={25} color={GREEN} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={[styles.itemTitle, { color: text }]}>SmartSpot Support</Text>
                    <Text style={{ color: muted }}>
                      Describe your issue below. Sending requires a backend support endpoint.
                    </Text>
                  </View>
                </View>

                <TextInput
                  style={[
                    styles.input,
                    styles.messageInput,
                    { color: text, borderColor: border },
                  ]}
                  value={supportMessage}
                  onChangeText={setSupportMessage}
                  placeholder="How can we help you?"
                  placeholderTextColor={muted}
                  multiline
                  textAlignVertical="top"
                />

                <TouchableOpacity style={styles.primaryButton} onPress={submitSupport}>
                  <Text style={styles.primaryButtonText}>Prepare Message</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "settings" && (
              <>
                <View style={[styles.optionRow, { borderColor: border }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.itemTitle, { color: text }]}>Dark mode</Text>
                    <Text style={{ color: muted }}>Change the profile appearance</Text>
                  </View>
                  <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#9CA3AF", true: "#8BD5B0" }}
                    thumbColor={darkMode ? GREEN : "#F9FAFB"}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.optionRow, { borderColor: border }]}
                  onPress={() =>
                    Alert.alert(
                      "SmartSpot",
                      "Smart parking made simpler. App version: Demo."
                    )
                  }
                >
                  <Ionicons name="information-circle-outline" size={24} color={GREEN} />
                  <Text style={[styles.itemTitle, { color: text, marginLeft: 12, flex: 1 }]}>
                    About SmartSpot
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={muted} />
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: text }]}>My Profile</Text>
        <Text style={[styles.pageSubtitle, { color: muted }]}>
          Manage your SmartSpot account
        </Text>

        <View style={[styles.profileBox, { backgroundColor: card }]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={52} color={GREEN} />
          </View>

          <Text style={[styles.name, { color: text }]}>{name}</Text>
          <Text style={[styles.email, { color: muted }]}>
            {email || "No email added"}
          </Text>
          {!!phone && <Text style={[styles.phone, { color: muted }]}>{phone}</Text>}

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModal("edit")}
          >
            <Ionicons name="create-outline" size={17} color={GREEN} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: text }]}>Account</Text>

        {menu.filter((item) => item.title !== "Edit Profile").map((item) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem, { backgroundColor: card }]}
            onPress={item.action}
            activeOpacity={0.75}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={23} color={GREEN} />
            </View>

            <View style={styles.menuCopy}>
              <Text style={[styles.menuText, { color: text }]}>{item.title}</Text>
              <Text style={[styles.menuSubtitle, { color: muted }]}>
                {item.subtitle}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color={muted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={23} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={[styles.footer, { color: muted }]}>
          SmartSpot · Smart parking made simpler
        </Text>
      </ScrollView>

      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 130 },
  pageTitle: { fontSize: 28, fontWeight: "800" },
  pageSubtitle: { fontSize: 14, marginTop: 5, marginBottom: 22 },
  profileBox: {
    alignItems: "center",
    borderRadius: 22,
    padding: 24,
    marginBottom: 27,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: "#EAF9F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  name: { fontSize: 23, fontWeight: "800" },
  email: { marginTop: 6, fontSize: 15 },
  phone: { marginTop: 5, fontSize: 14 },
  editButton: {
    marginTop: 16,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#EAF9F1",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  editButtonText: { color: GREEN, fontWeight: "700" },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 17,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF9F1",
    justifyContent: "center",
    alignItems: "center",
  },
  menuCopy: { flex: 1, marginLeft: 13 },
  menuText: { fontSize: 16, fontWeight: "700" },
  menuSubtitle: { fontSize: 12, marginTop: 4 },
  logout: {
    marginTop: 15,
    height: 56,
    borderRadius: 17,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  logoutText: { fontSize: 17, fontWeight: "800", color: "#fff" },
  footer: { textAlign: "center", fontSize: 12, marginBottom: 10 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    maxHeight: "85%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    paddingBottom: Platform.OS === "ios" ? 35 : 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 21, fontWeight: "800" },
  fieldLabel: { fontSize: 14, fontWeight: "700", marginBottom: 7, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: GREEN,
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 15,
  },
  primaryButtonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  emptyState: { alignItems: "center", paddingVertical: 28, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: "800" },
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
  },
  itemTitle: { fontSize: 15, fontWeight: "700" },
  typeRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  typeOption: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  helperText: { fontSize: 13, lineHeight: 19, marginBottom: 12 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    gap: 10,
  },
  supportInfo: { flexDirection: "row", alignItems: "flex-start", marginBottom: 15 },
  messageInput: { minHeight: 110 },
});