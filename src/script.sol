contract OnOffSwitch {
    bool private isOn;

    constructor() {
        isOn = true;
    }

    function toggle() public returns (bool) {
        isOn = !isOn;
        return isOn;
    }
}
