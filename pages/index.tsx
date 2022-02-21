import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [alpha, setAlpha] = useState(0);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) => {
        setAlpha(event.alpha);
      });
    }
  }, []);

  const orientationInfo = (
    <ul>
      <li>
        ɑ: <code>{alpha}</code>
      </li>
    </ul>
  );

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="p-3">
        <div className="bg-white rounded p-3">
          <ul>{orientationInfo}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
