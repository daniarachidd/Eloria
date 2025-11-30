export function validateShippingInfo(shippingInfo) {
    const errors = {};

    if (!shippingInfo.firstName) {
        errors.firstName = "First name is required.";
    }

    if (!shippingInfo.lastName) {
        errors.lastName = "Last name is required.";
    }

    if (!shippingInfo.email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!shippingInfo.phoneNumber) {
        errors.phoneNumber = "Phone number is required.";
    } else if (!/^\+90\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(shippingInfo.phoneNumber)) {
        errors.phoneNumber = "Please enter a valid phone number.";
    }

    if (!shippingInfo.city) {
        errors.city = "City is required.";
    }

    if (!shippingInfo.state) {
        errors.state = "State is required.";
    }

    if (!shippingInfo.zipCode) {
        errors.zipCode = "Zip code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(shippingInfo.zipCode)) {
        errors.zipCode = "Please enter a valid zip code.";
    }

    if (!shippingInfo.country) {
        errors.country = "Country is required.";
    }

    if (!shippingInfo.street) {
        errors.street = "Street address is required.";
    }

    return errors;
}
