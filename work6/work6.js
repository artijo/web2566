const RB=ReactBootstrap;

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyC54li7D05CqRewWXxyPTFM8Oge-YL3GKM",
          authDomain: "web2566-e7f78.firebaseapp.com",
          projectId: "web2566-e7f78",
          storageBucket: "web2566-e7f78.appspot.com",
          messagingSenderId: "786318872344",
          appId: "1:786318872344:web:218817e663cbfc284cd86d"
        };
      
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);      
        const db = firebase.firestore();

        // db.collection("students").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} =>`, doc.data());
        //     });
        // });
class App extends React.Component {
    title = (
      <RB.Alert variant="info">
        <b>Work6 :</b> Firebase
      </RB.Alert>
    );
    footer = (
      <div>
        By 653380118-9, อภิชัย ทินจอง <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
    }      
    render() {
      return (
        <RB.Card>
          <RB.Card.Header>{this.title}</RB.Card.Header>  
          <RB.Card.Body>
            <RB.Button variant="primary" onClick={() => this.readData()}>Read Data</RB.Button>
            <RB.Button variant="success" onClick={() => this.autoRead()}>Auto Read Data</RB.Button>
            <this.showData data={this.state.students} />
          </RB.Card.Body>
          <RB.Card.Footer>{this.footer}</RB.Card.Footer>
        </RB.Card>          
      );
    }      
    
    readData() {
        db.collection("students").get().then((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id, ...doc.data()});
            });
            this.setState({students:stdlist});
        });
    }

    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist = [];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id, ...doc.data()});
            });
            this.setState({students:stdlist});
        });
    }

    showData({data}){
        return (
            <RB.Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((std, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{std.id}</td>
                        <td>{std.fname}</td>
                        <td>{std.lname}</td>
                        <td>{std.email}</td>
                    </tr>
                ))}
            </tbody>
        </RB.Table>
        );
    }
}


  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);