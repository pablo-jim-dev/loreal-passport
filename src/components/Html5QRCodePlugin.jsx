// file = Html5QrcodePlugin.jsx
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, forwardRef } from 'react';
import { toast } from 'sonner';

const qrcodeRegionId = "html5qr-code-full-region";

const BarcodeScannerPluginRework = forwardRef(({
    qrCodeSuccessCallback
}) => {
    let html5QrCode;

    useEffect(() => {
        // Anything in here is fired on component mount.
        if (!html5QrCode?.getState()) {
            html5QrCode = new Html5Qrcode(qrcodeRegionId);
            const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.777778 };

            // If you want to prefer back camera
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                qrCodeSuccessCallback
            );
        }

        return () => {
            // Anything in here is fired on component unmount.

        };
    }, []);

    return <div id={qrcodeRegionId}></div>;
});

export default BarcodeScannerPluginRework;