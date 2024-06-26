import { useTheme } from "@/hooks/responsive";
import { useSettings } from "@/services/settings";
import { getColorForTheme, getContrastingColor, isDark } from "@/styles/colors";

export interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    color?: 'white';
    variant?: 'solid' | 'outline';
    compact?: boolean;
    disabled?: boolean;
}

const variants = {
    'primary-solid': 'bg-primary text-foreground',
    'primary-outline': 'bg-transparent border-primary text-primary hover:border-opacity-80',
    'secondary-solid': 'bg-secondary text-foreground',
    'secondary-outline': 'bg-transparent border-secondary text-secondary hover:border-opacity-80',
}

export default function Button(props: ButtonProps) {
    const {className, color, compact, onClick, ...rest} = props;
    const variant = variants[`${props.color ?? 'primary'}-${props.variant ?? 'outline'}`];
    return <button className={`${className}
        flex justify-center text-center
        rounded
        hover:opacity-80
        ripple-bg-gray-300
        ${compact ? 'p-1' : 'p-2 border'}
        ${variant}`}
        onClick={!props.disabled ? onClick : undefined}
        {...rest}/>
}