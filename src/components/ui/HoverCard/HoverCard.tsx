import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

interface HoverCardProps {
	children: ReactNode;
	content: ReactNode;
	className?: string;
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	alignOffset?: number;
}

const HoverCard = forwardRef<HTMLAnchorElement, HoverCardProps>(
	(
		{ children, content, className, side, alignOffset, align, ...props },
		ref
	) => (
		<HoverCardPrimitive.Root openDelay={0} closeDelay={0}>
			<HoverCardPrimitive.Trigger asChild ref={ref} {...props}>
				{children}
			</HoverCardPrimitive.Trigger>
			<HoverCardPrimitive.Portal>
				<HoverCardPrimitive.Content
					align={align}
					alignOffset={alignOffset}
					side={side}
					className={clsx("hover-card-content", className)}
				>
					{content}
					<HoverCardPrimitive.Arrow fill="#fffh" className="hover-card-arrow" />
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Portal>
		</HoverCardPrimitive.Root>
	)
);

HoverCard.displayName = "HoverCard";

export default HoverCard;
