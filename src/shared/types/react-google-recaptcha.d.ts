declare module 'react-google-recaptcha' {
    import * as React from 'react';

    export interface ReCAPTCHAProps {
        sitekey: string;
        onChange?: (token: string | null) => void;
        onExpired?: () => void;
        onErrored?: () => void;
        theme?: 'light' | 'dark';
        size?: 'compact' | 'normal' | 'invisible';
        tabIndex?: number;
        badge?: 'bottomright' | 'bottomleft' | 'inline';
        hl?: string;
        className?: string;
    }

    export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
        reset(): void;
        execute(): void;
    }
}