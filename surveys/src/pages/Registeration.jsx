import React, { useState } from "react";
import Layout from "../layout/Layout";
import UserInfoForm from "../components/UserInfoForm";

export default function Registeration() {
  const [userInfo, setUserInfo] = useState(null);

  return <UserInfoForm onSubmit={setUserInfo} />;
}
