/**
 * Dummy AWS application
 * @license 0BSD
 * @author Luke Zhang luke-zhang-04.github.io
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the 0BSD License
 *
 * This program is distributed in the hope that it will be useful,
 * but THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 */

import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core"
import DeleteIcon from"@material-ui/icons/Delete";
import React from "react"

interface Props {
    title: string,
    desc: string,
    complete?: boolean,
}

export const TodoItem = (
    {title, desc, complete}: Props,
): JSX.Element => <ListItem button className="listitem">
    <ListItemIcon>
        <Checkbox
            edge="start"
            checked={complete}
            tabIndex={-1}
        />
    </ListItemIcon>
    <ListItemText primary={title} secondary={desc}/>
    <ListItemSecondaryAction>
        <IconButton edge="end">
            <DeleteIcon/>
        </IconButton>
    </ListItemSecondaryAction>
</ListItem>

export default TodoItem
