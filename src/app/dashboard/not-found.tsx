import Link from "next/link";
import Custom404 from "../ui/Custom404";

export default function NotFound() {
    return (
        <Custom404 href="/dashboard" buttonName="Dashboard" />
    );
}
