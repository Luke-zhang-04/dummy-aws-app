import React from "react"

interface Props {
    title: string,
}

export const ListItem = ({title}: Props): JSX.Element => <li>
    {title}
</li>

export default ListItem
