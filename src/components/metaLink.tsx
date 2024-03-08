import React, { HTMLAttributes } from 'react';

interface MetaLinkProps extends HTMLAttributes<HTMLLinkElement> {
    href: string;
    rel?: string;
    type?: string;
}

const MetaLink: React.FC<MetaLinkProps> = ({
    href,
    rel = 'stylesheet',
    type = 'text/css',
    ...rest
}) => {
    return <link {...rest} href={href} rel={rel} type={type} />;
};

export default MetaLink;