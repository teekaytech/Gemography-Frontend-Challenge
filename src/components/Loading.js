import '../stylesheets/loading.scss';
import ReactLoading from "react-loading";

function Loading() {
  return (
    <section>
      <ReactLoading
        type="spokes"
        height="7%"
        width="7%"
        className="container"
      />
    </section>
  );
}

export default Loading
