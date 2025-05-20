export default function Loading() {
    return (
        <div id="page-loader" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#fff",
            zIndex: 9999,
        }}></div>
    )
};