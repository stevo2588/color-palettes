import ColorPalette from '../components/color-palette';


const Home = () => {
  return (
    <div style={{ margin: 20 }}>
      <ColorPalette
        values={
          [0,1,2,3,4].map(c => ({ [c]: { red: 0, green: 0, blue: 0 } }))
          .reduce((a,b) => ({...a, ...b}))
        }
        onSave={(palette) => console.log(palette)}
      />
    </div>
  );
};

export default Home;
