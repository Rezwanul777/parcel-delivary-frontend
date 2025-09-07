// const Faqs = () => {
//   return (
//     <div className="py-24">

//         <h3 className="text-primary text-4xl font-bold text-center"> Frequently Asked Questions </h3>

//       <div className="space-y-4 max-w-5xl mx-auto my-12">
//         <details
//           className="group [&_summary::-webkit-details-marker]:hidden"
//           open
//         >
//           <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
//             <h2 className="text-lg font-medium">
//               Lorem ipsum dolor sit amet consectetur adipisicing?
//             </h2>

//             <svg
//               className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </summary>

//           <p className="px-4 pt-4 text-gray-900 dark:text-white">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
//             veritatis molestias culpa in, recusandae laboriosam neque aliquid
//             libero nesciunt voluptate dicta quo officiis explicabo consequuntur
//             distinctio corporis earum similique!
//           </p>
//         </details>

//         <details className="group [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
//             <h2 className="text-lg font-medium">
//               Lorem ipsum dolor sit amet consectetur adipisicing?
//             </h2>

//             <svg
//               className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </summary>

//           <p className="px-4 pt-4 text-gray-900 dark:text-white">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
//             veritatis molestias culpa in, recusandae laboriosam neque aliquid
//             libero nesciunt voluptate dicta quo officiis explicabo consequuntur
//             distinctio corporis earum similique!
//           </p>
//         </details>

//         <details className="group [&_summary::-webkit-details-marker]:hidden">
//           <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
//             <h2 className="text-lg font-medium">
//               Lorem ipsum dolor sit amet consectetur adipisicing?
//             </h2>

//             <svg
//               className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </summary>

//           <p className="px-4 pt-4 text-gray-900 dark:text-white">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
//             veritatis molestias culpa in, recusandae laboriosam neque aliquid
//             libero nesciunt voluptate dicta quo officiis explicabo consequuntur
//             distinctio corporis earum similique!
//           </p>
//         </details>
//       </div>
//     </div>
//   );
// };
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "How do I track my parcel?",
    answer:
      "You can track your parcel in real-time using the tracking ID provided at the time of booking. Just enter it in the Track Parcel section of our app.",
  },
  {
    id: "faq-2",
    question: "What happens if my parcel is delayed?",
    answer:
      "If your parcel is delayed, you will receive a notification with the updated delivery time. You can also contact support for further assistance.",
  },
  
  {
    id: "faq-3",
    question: "How long does delivery usually take?",
    answer:
      "Standard deliveries usually take 1–3 business days, depending on the destination. Express options are also available for urgent shipments.",
  },
  {
    id: "faq-4",
    question: "What should I do if my parcel is lost?",
    answer:
      "In the rare case of a lost parcel, please contact our support team immediately. We will investigate and initiate compensation if applicable.",
  },
  {
    id: "faq-5",
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team 24/7 through live chat in the app, email, or our customer care hotline.",
  },
];


 const Faqs = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about booking, tracking, and delivering parcels. Can't find what you're looking for? Contact our support team anytime.",
  items = faqItems,
}: Faq3Props) => {
  return (
    <section id="faq" className="py-32">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs

