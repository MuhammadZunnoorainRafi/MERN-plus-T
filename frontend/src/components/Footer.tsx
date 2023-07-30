import moment from 'moment';

function Footer() {
  return (
    <div className="py-2 text-center  font-semibold tracking-widest  bg-base-300 text-base-content ">
      Blog &copy; {moment().format('DD-MMM-YYYY ')}
    </div>
  );
}

export default Footer;
