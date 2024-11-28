// Tremor Raw Drawer [v0.0.0]

import * as React from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";
import { RiCloseLine } from "@remixicon/react";

import { cn } from "../../lib/utils";

import { Button } from "./button";

const Drawer = (props) => {
  return <DrawerPrimitives.Root {...props} />;
};
Drawer.displayName = "Drawer";

const DrawerTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Trigger ref={ref} className={cn(className)} {...props} />
  );
});
DrawerTrigger.displayName = "Drawer.Trigger";

const DrawerClose = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Close ref={ref} className={cn(className)} {...props} />
  );
});
DrawerClose.displayName = "Drawer.Close";

const DrawerPortal = DrawerPrimitives.Portal;
DrawerPortal.displayName = "DrawerPortal";

const DrawerOverlay = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DrawerPrimitives.Overlay
        ref={forwardedRef}
        className={cn(
          // base
          "fixed inset-0 z-50 overflow-y-auto",
          // background color
          "bg-black/30",
          // transition
          "data-[state=closed]:animate-hide data-[state=open]:animate-dialogOverlayShow",
          className
        )}
        {...props}
        style={{
          animationDuration: "400ms",
          animationFillMode: "backwards",
        }}
      />
    );
  }
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DrawerPortal>
        <DrawerOverlay>
          <DrawerPrimitives.Content
            ref={forwardedRef}
            className={cn(
              // base
              "fixed inset-y-2 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg focus:outline-none max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
              // border color
              "border-gray-200 dark:border-gray-900",
              // background color
              "bg-white dark:bg-[#090E1A]",
              // transition
              "data-[state=closed]:animate-drawerSlideRightAndFade data-[state=open]:animate-drawerSlideLeftAndFade",
              className
            )}
            {...props}
          />
        </DrawerOverlay>
      </DrawerPortal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-start justify-between gap-x-4 border-b border-gray-200 pb-4 dark:border-gray-900"
        {...props}
      >
        <div className={cn("mt-1 flex flex-col gap-y-1", className)}>
          {children}
        </div>
        <DrawerPrimitives.Close asChild>
          <Button
            variant="ghost"
            className="aspect-square p-1 hover:bg-gray-600 hover:dark:bg-gray-400/70 text-white "
          >
            <RiCloseLine className="size-6" aria-hidden="true" />
          </Button>
        </DrawerPrimitives.Close>
      </div>
    );
  }
);
DrawerHeader.displayName = "Drawer.Header";

const DrawerTitle = React.forwardRef(
  ({ className, ...props }, forwardedRef) => (
    <DrawerPrimitives.Title
      ref={forwardedRef}
      className={cn(
        // base
        "text-base font-semibold",
        // text color
        "dark:text-gray-900 text-gray-50",
        className
      )}
      {...props}
    />
  )
);
DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 py-4", className)} {...props} />;
});
DrawerBody.displayName = "Drawer.Body";

const DrawerDescription = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DrawerPrimitives.Description
        ref={forwardedRef}
        className={cn("text-gray-500 dark:text-gray-500", className)}
        {...props}
      />
    );
  }
);
DrawerDescription.displayName = "DrawerDescription";

const DrawerFooter = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse border-t border-gray-200 pt-4 sm:flex-row sm:justify-end sm:space-x-2 dark:border-gray-900",
        className
      )}
      {...props}
    />
  );
};
DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};