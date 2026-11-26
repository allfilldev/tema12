import { BatchSchedule } from '@/sections/BatchSchedule';
import { BestSeller } from '@/sections/BestSeller';
import { HeroSlider } from '@/sections/HeroSlider';
import { ClientLogos, CollectionBanners, CorporateBand, InstagramGrid, Perks, Selections, Story, Testimonials } from '@/sections/home';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <Perks />
      <Selections />
      <BestSeller />
      <CollectionBanners />
      <section className="container-page pt-20">
        <BatchSchedule />
      </section>
      <Story />
      <CorporateBand />
      <ClientLogos />
      <Testimonials />
      <InstagramGrid />
    </>
  );
}
