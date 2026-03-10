function colorScale(value, medThreshold, badThreshold) {
    if (value > badThreshold) {
        return "danger";
    }
    if (value > medThreshold) {
        return "warning";
    }
    return "success";
}

function colorScaleInverse(value, medThreshold, badThreshold) {
    if (value < badThreshold) {
        return "danger";
    }
    if (value < medThreshold) {
        return "warning";
    }
    return "success";
}

export {colorScale, colorScaleInverse};