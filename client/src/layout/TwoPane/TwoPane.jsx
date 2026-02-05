export default function TwoPane({ list, detail }) {
  return (
    <div className="two-pane">
      <section className="pane pane-list">{list}</section>
      <section className="pane pane-detail">{detail}</section>
    </div>
  );
}
