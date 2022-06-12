import { ButtonProps, Menu } from "@mantine/core";
import type { NextPage } from "next";

import { cloneElement, forwardRef, useEffect, useState } from "react";
import { Button as MantineButton } from "@mantine/core";
import {
  useMediaQuery as useMediaQueryOriginal,
  useViewportSize as useViewportSizeOriginal,
} from "@mantine/hooks";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps<"button" | "a"> & { dent?: boolean }
>(({ sx, dent, ...props }, ref) => {
  return cloneElement(<MantineButton />, {
    sx: {
      ...sx,
      "&:not(:disabled):active": dent ? undefined : { transform: "none" },
    },
    ref,
    ...props,
  });
});

Button.displayName = "Button";

const map = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1400px",
} as const;

const useMediaQuery = (
  query: keyof typeof map,
  initialValue: Parameters<typeof useMediaQueryOriginal>[1] = true
) => {
  return useMediaQueryOriginal(`(min-width: ${map[query]})`, initialValue);
};

const useViewportSize = () => {
  const [mounted, setMounted] = useState(false);
  const viewportSize = useViewportSizeOriginal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? viewportSize : { width: undefined, height: undefined };
};

const Home: NextPage = () => {
  const { width } = useViewportSize();
  const largerThanXs = useMediaQuery("xs");
  const largerThanSm = useMediaQuery("sm");
  const largerThanMd = useMediaQuery("md");
  const largerThanLg = useMediaQuery("lg");
  const largerThanXl = useMediaQuery("xl");

  return (
    <div>
      <h1 className="my-0 rounded-2xl text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>{`width: ${width}`}</div>
      <div>{`largerThanXs: ${largerThanXs}`}</div>
      <div>{`largerThanSm: ${largerThanSm}`}</div>
      <div>{`largerThanMd: ${largerThanMd}`}</div>
      <div>{`largerThanLg: ${largerThanLg}`}</div>
      <div>{`largerThanXl: ${largerThanXl}`}</div>
      <Button className="rounded-xl">Button</Button>
      <Menu className="border" styles={{ body: { borderRadius: "0.75rem" } }}>
        <Menu.Item style={{ fontWeight: 700 }}>設定</Menu.Item>
        <Menu.Item color="red">ログアウト</Menu.Item>
      </Menu>
    </div>
  );
};

export default Home;
