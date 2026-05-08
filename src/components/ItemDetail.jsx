export const ItemDetail = ({data}) => {
  return (
    <div className="flex flex-col p-8">
      <h1>{data.title}</h1>
      <h2>{data.price}</h2>
      
    </div>
  );
};