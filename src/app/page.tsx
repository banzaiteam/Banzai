"use client";
import colors from "tailwindcss/colors";
import { Icon } from "@shared/ui/icon/Icon";
import { RadixTextarea } from "@shared/ui";
import Select from "@/shared/ui/select/Select";

export default function Page() {
  return (
    <main>
      Banzai
      <RadixTextarea />
      <RadixTextarea disabled />
      <RadixTextarea error errorMessage="Ошибка" />
      <Icon name="home-outline" size={92} stroke="#fff" />
      <Select
        options={[
          { label: "English", value: "en" },
          { label: "Spanish", value: "es" },
        ]}
        placeholder="Select ..."
        onValueChange={(v) => console.log(v)}
        // disabled={true}
      />
    </main>
  );
}
