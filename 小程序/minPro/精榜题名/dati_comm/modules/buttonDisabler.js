let disabled = false;

const buttonDisabler = {
    canClick: function () {
        if (!disabled) {
            disabled = true;
            setTimeout(() => {
                disabled = false;
            }, 600);
            return true;
        }

        return false;
    }
};

export {buttonDisabler};