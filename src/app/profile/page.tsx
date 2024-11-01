import React from "react";
import BackBtn from "../signup/BackBtn";
import Button from "../../components/Button";

const profile = () => {
  return (
    <div>
      <BackBtn navigation={"/introScreens"} />
      <h2>Tell us about you</h2>
      <div className="p-5 grid gap-1">
          <label htmlFor="sex" className="text-purple-500">性別</label>
          <select
            id="sex"
            name="sex"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            required
          >
            <option value="gender">-</option>
            <option value="mela">男性</option>
            <option value="female">女性</option>
          </select>
          <label htmlFor="birthday" className="text-purple-500">生年月日</label>
          <input
            type="date"
            name="birthdate"
            id="birthday"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            placeholder="2000/01/01"
            required
          />
          <label htmlFor="nationality" className="text-purple-500">国/地域</label>
          <select
            id="nationality"
            name="nationality"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            required
          >
            <option value="japan">Japan</option>
            <option value="america">America</option>
          </select>
      </div>
      <Button title={"Next"} navigation={"#"}/>
    </div>
  );
};

export default profile;