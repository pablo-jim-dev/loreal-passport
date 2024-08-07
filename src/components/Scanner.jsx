import React, { useEffect, useRef, useState } from 'react'
import Html5QrcodePlugin from './Html5QRCodePlugin'
import { checkin } from '../api/public.api';
import { toast } from 'sonner';

export const Scanner = () => {
    const [decoded, setDecoded] = useState('');
    const [isScanning, setIsScanning] = useState(true);
    const html5QrCodeRef = useRef(null);

    const onStopScan = () => {
        if (html5QrCodeRef.current) {
            console.log('Stopping Scan');

            html5QrCodeRef.current.stop().then(() => {
                console.log('Stop Success');
                setIsScanning(false);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const onNewScanResult = async (decodedText, decodedResult) => {
        if (decodedText === decoded) return;
        setDecoded(decodedText);
    };

    useEffect(() => {
        if (decoded !== '') {
            checkin({ userId: decoded }).then((response) => {
                toast.success(response.data.message);
            }).catch((error) => {
                toast.error(error.response.data.message);
            });

            const timeout = setTimeout(() => {
                setDecoded('');
            }, 2000);
            return () => clearTimeout(timeout);
        }

        return () => {
            onStopScan();
        }
    }, [decoded])


    return (
        <Html5QrcodePlugin
            ref={html5QrCodeRef}
            fps={10}
            qrbox={200}
            aspectRatio={1.777778}
            disableFlip={true}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={null}
            videoConstraints={{ facingMode: 'environment' }}
        />
    )
}