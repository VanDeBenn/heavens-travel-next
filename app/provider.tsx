"use client";

import React, {useEffect} from "react";
import {ConfigProvider} from "antd";
import {TokenUtil} from "#/utils/token";
import { AliasToken } from "antd/es/theme/interface/alias";

TokenUtil.loadToken();
export const Provider = ({children}: any) => {
  // useEffect(() => {
  //   // @ts-ignore
  //   document.documentElement.style.opacity = 1
  // }, []);

  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#4F28D9',
      } as Partial<AliasToken>,
    }}
  >
    {children}
  </ConfigProvider>
}
