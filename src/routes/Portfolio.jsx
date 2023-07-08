import { Component } from "react";
import Loader from "../components/Loader"
import PhotoAlbum from "react-photo-album";
import { useParams } from "react-router-dom";
import files, { importImages } from "../components/Files";
import { Content, Title } from "../components/styled";
import ScrollTop from '../components/ScrollTop'
import imagesloaded from 'imagesloaded'
import Modal from "../components/Modal";
import axios from "axios"

function portfolioRoute(PortfolioRoute) {
  return function WrappedPrarams(props) {
    const params = useParams();
    return <PortfolioRoute {...props} params={params} />
  }
}

function rowHeightConfig(containerWidth) {
  if (containerWidth < 768) return (containerWidth / 1.5);
  return (containerWidth / 3);
}

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: {},
      isLoaded: false,
      title: "" || this.props.title,
      modal: {
        state: false,
        src: "",
        height: "",
        width: "",
      },
    }
  }

  initialize() {
    window.scrollTo(0, 0);
    console.log('caches' in window)
    if ('caches' in window) {
      caches.open('images').then((cache) => {
        cache.match(this.props.title).then(resp => {
          if (resp) {
            resp.json().then(data => {
              if (Date.now() - data.timestamp < 5 * 60 * 1000) {
                this.setState({ folders: data.folders });
              }
            });
          } else {
            axios.post("/images", { folder: this.props.title }).then((res) => {
              const data = new Response(JSON.stringify({ folders: res.data, timestamp: Date.now() }));
              cache.put(this.props.title, data);
              this.setState({ folders: res.data })
            }).catch((err) => {
              throw new Error(err)
            })
          }
        })
      });
    }
  }

  componentDidMount() {
    this.initialize()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.title !== this.props.title) {
      this.initialize()
    }
    if (!prevState.folders && this.state.folders) {
      imagesloaded('.react-photo-album', (inst) => {
        if (!inst.images.length && this.state.isLoaded) return
        this.setState({ isLoaded: true })
      })
    }
  }

  render() {
    const { isLoaded, title, modal, folders } = this.state;
    return (
      <>
        <Modal {...modal} close={() => this.setState({ modal: { state: false, src: "" } })} />
        <Content>
          {!isLoaded ? <Loader /> : undefined}
          <Title>
            <h2>{title}</h2>
          </Title>
          {
            folders?.folders &&
            folders?.folders?.map(
              ({ files, name, folders }, key) => (
                <PhotoAlbum
                  layout="rows"
                  photos={files}
                  targetRowHeight={rowHeightConfig}
                  onClick={({ index }) => {
                    this.setState({
                      modal: {
                        state: true,
                        ...photos[index]
                      }
                    })
                  }}
                  key={name}
                />
              )
            )
          }
          <PhotoAlbum
            layout="rows"
            photos={folders?.files}
            targetRowHeight={rowHeightConfig}
            onClick={({ index }) => {
              this.setState({
                modal: {
                  state: true,
                  ...photos[index]
                }
              })
            }}
          />
          <ScrollTop />
        </Content>
      </>
    )
  }
}

export default portfolioRoute(Portfolio)
