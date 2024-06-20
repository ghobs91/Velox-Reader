import IconButton from "./IconButton";
import { MenuItem } from "./Menu";
import ViewMode from "../icons/viewmode.svg";
import React, { useCallback } from "react";
import ToggleMenu from "./ToggleMenu";

interface Props {
    value: 'feedly' | 'mozilla' | 'browser';
    onChange: (value: 'feedly' | 'mozilla' | 'browser') => void;
}

const PreferredViewMenu = (props: Props) => {
    const onChange = props.onChange;
    const menuItemClicked = useCallback((e) => {
        const value = e.target.getAttribute('value');
        onChange(value);
    }, [onChange]);

    return <div className="reader-view-toggle">
        <ToggleMenu trigger={
        <IconButton>
            <ViewMode />
        </IconButton>}>
            <MenuItem
                selected={props.value === "feedly"}
                value="feedly"
                onClick={menuItemClicked}>Feedly</MenuItem>
            <MenuItem
                selected={props.value === "mozilla"}
                value="mozilla"
                onClick={menuItemClicked}>Mozilla Readability</MenuItem>
            <MenuItem
                selected={props.value === "browser"}
                value="browser"
                onClick={menuItemClicked}>Browser</MenuItem>
        </ToggleMenu>
    </div>
};

export default PreferredViewMenu;