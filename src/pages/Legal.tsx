import { useLocation } from 'react-router-dom'
import { PageHero, TextLink } from '../components/UI'
export default function Legal() {
  const privacy = useLocation().pathname === '/privacy'
  return <><PageHero label="TECHNEXA / SITE INFORMATION" title={privacy ? 'Privacy.' : 'Terms of use.'} description={privacy ? 'How this website handles information in its current configuration.' : 'A clear description of this website and its illustrative material.'}/><article className="legal-body container">{(privacy ? [
    ['Project brief information','The project enquiry keeps the information you enter in the current page’s memory. It is not submitted to a server by this form. Reloading the page clears the draft. Downloading saves a text file on your device; copying places it on your clipboard.'],
    ['Sharing your brief','If a business inbox is configured, the email action opens your email application with a draft. You decide whether to send it. Your email provider’s own terms and privacy practices apply to that action.'],
    ['Browser storage and assets','The opening animation runs locally and does not store information. Fonts and brand assets are served with the site. No analytics or advertising trackers are included in this application.'],
    ['Hosting and questions','The hosting provider may process ordinary request information to deliver the site. For questions, use the contact page or the business inbox shown there when configured.'],
  ] : [
    ['Website purpose','The site introduces Technexa’s approach and capabilities. It does not create a services agreement. Scope, fees, delivery commitments, intellectual property and support terms are agreed separately in an engagement proposal.'],
    ['Illustrative system studies','The system archive and product interfaces are Technexa concept studies with sample data. They are not claims of client deployments, operating performance or independently verified business results. Workflow demonstrations run locally and do not operate external business systems.'],
    ['Technology references','Technology names identify tools and architectural options. They do not imply a partnership, certification or endorsement. Final technology selections depend on discovery and project requirements.'],
    ['Brand and original material','The Technexa name, mark and original site material identify Technexa Solutions. Third-party technology marks remain associated with their respective owners. Contact Technexa to discuss reuse of original materials.'],
  ]).map(([h,p]) => <section key={h}><h2>{h}</h2><p>{p}</p></section>)}<TextLink to="/contact">Contact Technexa</TextLink></article></>
}
