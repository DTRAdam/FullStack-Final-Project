/// <reference types="@google/model-viewer" />
import 'react';

declare module "react/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    alt?: string;
                    poster?: string;
                    ar?: boolean;
                    'ar-modes'?: string;
                    'ar-scale'?: 'auto' | 'fixed';
                    'ar-placement'?: 'floor' | 'wall';
                    'ios-src'?: string;
                    'camera-controls'?: boolean;
                    'auto-rotate'?: boolean;
                    'auto-rotate-delay'?: number | string;
                    'rotation-per-second'?: string;
                    'camera-orbit'?: string;
                    'camera-target'?: string;
                    'field-of-view'?: string;
                    'max-camera-orbit'?: string;
                    'min-camera-orbit'?: string;
                    'max-field-of-view'?: string;
                    'min-field-of-view'?: string;
                    exposure?: number | string;
                    'shadow-intensity'?: number | string;
                    'shadow-softness'?: number | string;
                    'skybox-image'?: string;
                    'environment-image'?: string;
                    loading?: 'auto' | 'lazy' | 'eager';
                    reveal?: 'auto' | 'interaction' | 'manual';
                    children?: React.ReactNode;
                    [key: `data-${string}`]: any;
                },
                HTMLElement
            >;
        }
    }
}

export { };