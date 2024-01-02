export const formatNumber = (number) => {
    // Ensure that the input is a valid number
    if (isNaN(number)) {
        console.error('Invalid number');
        return '';
    }

    // Convert the number to a string and split it into parts
    const parts = number.toString().split('.');

    // Format the whole number part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Join the parts back together
    return parts.join('.');
};
