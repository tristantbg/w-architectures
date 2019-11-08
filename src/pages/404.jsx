import React from "react";

const NotFound = () => (
  <div className="page404">
    <h1 className="b-b pad">Page Not Found</h1>
    <p>Oops, we couldn't find this page!</p>
  </div>
);

export default NotFound;

// import React from "react";
// import SEO from "../components/seo";

// const browser = typeof window !== "undefined" && window;

// const NotFoundPage = () => {
//   return (
//     browser && (
//       <div>
//         <SEO title="404 Page not found" />
//         <h1>404 Error content...</h1>
//       </div>
//     )
//   );
// };

// export default NotFoundPage;