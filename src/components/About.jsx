import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { businessInfo } from '../data/businessInfo';
import SectionHeading from './SectionHeading';
import ActionLink from './ActionLink';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-heading" title="About God's Foundation Technologies">
            {businessInfo.description}
          </SectionHeading>
          <ActionLink href="#contact" external={false} className="mt-6">
            Get in Touch
          </ActionLink>
        </div>
        {businessInfo.aboutPhoto ? (
          <img
            src={businessInfo.aboutPhoto}
            alt={businessInfo.aboutPhotoAlt || ''}
            width="640"
            height="480"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-mist text-center text-muted" role="img" aria-label="Store photo coming soon">
            <FontAwesomeIcon icon={faStore} className="text-4xl" aria-hidden="true" />
            <span className="text-sm">Store photo coming soon</span>
          </div>
        )}
      </div>
    </section>
  );
}
