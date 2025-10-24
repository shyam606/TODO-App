import { FaRegCalendarMinus } from "react-icons/fa";

export const ReactIcons = {
    CalendarIcon: ({ size='20',color='#000', className, onClick }) => <FaRegCalendarMinus size={size} color={color} className={`${className} cursor-pointer`} onClick={onClick} />
}