import React, { Component } from "react";
import { toastActions, coreActions, playlistManipulatorActions } from "../actions";
import "../assets/css/artistalbums.css";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { musicDummy, spaceImage } from "../assets/images";
import { AlbumHolder } from ".";
import axios from "axios";
import Loader from "react-loader-spinner";
import { variables } from "../config";

class ArtistAlbums extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			artistAlbums: [],
			artistName: "",
			isLoading: true,
			artistThumbnail: "",
			artistId: "",
		};
		this.state = { ...this.initialState };
	}

	componentDidMount() {
		this.props.setCurrentAction("Artist Albums");
		this.fetchArtistAlbumsHandler();
	}

	fetchArtistAlbumsHandler = async () => {
		try {
			const artistFetchUrl = `${variables.baseUrl}/playlist/artist/fetch?tagId=${this.props.match.params.id}`;
			const artistData = (await axios.get(artistFetchUrl)).data;
			if (artistData.status) {
				const { name, thumbnail, _id } = artistData.data;
				this.setState({ artistName: name, artistThumbnail: thumbnail, artistId: _id });
			} else {
				throw new Error(artistData.data);
			}
			const artistAlbumsFetchUrl = `${variables.baseUrl}/playlist/artist/${this.props.match.params.id}/releases`;
			const albumsData = (await axios.get(artistAlbumsFetchUrl)).data;
			if (albumsData.status) this.setState({ isLoading: false, artistAlbums: albumsData.data });
			else throw new Error(albumsData.data);
		} catch (error) {
			this.props.notify(error.message.toString());
			this.props.push("/");
		}
	};

	addOrRemoveAlbumFromCollectionHandler = (isAdd = true, albumId) => {
		this.props.addOrRemoveAlbumFromUserCollection(albumId, isAdd);
	};

	componentWillUnmount() {
		this.setState({ ...this.initialState });
	}

	render() {
		return this.state.isLoading ? (
			<div className="width-100 height-100 d-flex align-items-center justify-content-center">
				<Loader type="ThreeDots" color="#F32C2C" height={80} width={80} />
			</div>
		) : (
				<div className="artist-albums-wrapper">
					<div className="artist-albums-header-image-holder" style={{ backgroundImage: `url(${spaceImage})` }}>
						<div
							className="artist-albums-header-artist-display-holder"
							style={{ backgroundImage: `url(${this.state.artistThumbnail}), url(${musicDummy})` }}></div>
						<div className="artist-albums-artist-name">{this.state.artistName}</div>
					</div>
					{this.state.artistAlbums.length > 0 && (
						<div className="artist-albums-main-container">
							{this.state.artistAlbums.map((item, key) => (
								<AlbumHolder
									key={key}
									albumName={item.name}
									albumThumbnail={item.thumbnail}
									albumTotalSongs={item.totalSongs}
									albumId={item._id}
									albumCreationDate={new Date().toDateString()}
									albumCreatedBy={"OpenBeats"}
									type={"album"}
									addOrRemoveAlbumFromCollectionHandler={this.addOrRemoveAlbumFromCollectionHandler}
									isAuthenticated={this.props.isAuthenticated}
									isAlbumIsInCollection={this.props.likedPlaylists.indexOf(item._id) === -1 ? false : true}
								/>
							))}
						</div>
					)}
					{this.state.artistAlbums.length === 0 && (
						<div className="height-200px font-weight-bold d-flex align-items-center justify-content-center text-align-center">
							No Albums Found! <br />
							<br /> Stay Tuned For Updates!
						</div>
					)}
				</div>
			);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.isAuthenticated,
		likedPlaylists: state.authReducer.likedPlaylists,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		push: path => {
			dispatch(push(path));
		},
		notify: message => {
			toastActions.showMessage(message);
		},
		featureNotify: () => {
			toastActions.featureNotify();
		},
		setCurrentAction: action => {
			dispatch(coreActions.setCurrentAction(action));
		},
		addOrRemoveAlbumFromUserCollection: async (albumId, isAdd = true) => {
			return await playlistManipulatorActions.addOrRemoveAlbumFromUserCollection(albumId, isAdd);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistAlbums);
