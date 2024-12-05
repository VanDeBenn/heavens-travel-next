import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <img src="/images/illustration/404.webp" alt="" />
      <h2>Sorry, the page you are looking for could not be found.</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
