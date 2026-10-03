'use client';
export default function Error({reset}:{reset:()=>void}){return <section className="section container"><h1>We Couldn’t Load This Page.</h1><p>Please try again.</p><button className="btn btn-primary" onClick={reset}>Try again</button></section>}
