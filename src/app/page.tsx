import colors from "tailwindcss/colors";
import {Icon} from "@shared/ui/icon/Icon";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      Banzai
      <p>some text</p>
            <Icon name="home-outline" size={92} stroke='#fff'  />
    </main>
  );
}
