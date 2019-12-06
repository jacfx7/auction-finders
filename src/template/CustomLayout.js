import React from "react";
import { Layout } from "react-admin";

import CustomAppBar from "@/template/CustomAppBar";

const CustomLayout = props => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
