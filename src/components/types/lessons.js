import React from "react";
import { SmallJumbotron } from "../smalljumbo.jsx";
import { Filter, Loading, Icon } from "@breathecode/ui-components";
import { Context } from "../../store/appContext.jsx";
import Store from "../../store/appContext.jsx";
import Navbar from "../navbar.jsx";
import Footer from "../footer.jsx";
import "@breathecode/ui-components/dist/main.css";
import Layout from "../layout";
import Helmett from "../helmet";
import {Link} from "gatsby";
import queryString  from 'query-string';
import { Location, navigate } from '@reach/router';
import withLocation from "../withLocation";
import emoji from 'node-emoji';
import qs from "query-string";
import { useLocalStorage } from "../../utils/useLocalStorage.js";



const flag ={
    margin: "1px 0px"
}

export class Lessons extends React.Component {
	constructor(props) {
		super(props);
        const { location } = props;

		this.state = {
            defaultLanguages: [location.search.includes("lang=") ? this.getLanguage(location.search) :"en"],
			defaultTags: location.search.includes("topics=") ? this.getTopics(location.search) :[],
            defaultAuthor:location.search.includes("authors=") ? this.getAuthors(location.search) :[],
            selectedLanguages:[],
            selectedTags: [],
			selectedAuthors: [],
            changeAsset:false,
            changeLesson:false,
            displayLesson:false,
            displayAssets:true,
            selectedTypeTags:[],
            selectedTechTags:[],
            selectedTopicTags:[],
            assetDefaultTechTags:location.search.includes("technologies=") ? this.getTechnologies(location.search) :[],
            assetByDefaultTopicTags:location.search.includes("assetTopics=") ? this.getAssetTopics(location.search) :[],
            assetsByDefaultType: location.search.includes("assetType=") ? this.getAssetType(location.search) :[],
		};


	}
    filterByDefaultType = asset => {
		if (this.state.assetsByDefaultType.length == 0) return true;
		for (let i = 0; i < this.state.assetsByDefaultType.length; i++) {
			if (asset.types!==null?asset.types.includes(this.state.assetsByDefaultType[i]):"") return true;
		}
		return false;
	}
    filterByDefaultTopic = asset => {
		if (this.state.assetByDefaultTopicTags.length == 0) return true;
		for (let i = 0; i < this.state.assetByDefaultTopicTags.length; i++) {
			if (asset.topics.includes(this.state.assetByDefaultTopicTags[i])) return true;
		}
		return false;
	}
    filterByDefaultTech = asset => {
		if (this.state.assetDefaultTechTags.length == 0) return true;

		for (let i = 0; i < this.state.assetDefaultTechTags.length; i++) {

			if (asset.technologies.includes(this.state.assetDefaultTechTags[i])) return true;

		}

		return false;
	}
    getTechnologies=(queryString)=>{
        let params = qs.parse(queryString);
        let technologies = params.technologies.split(",");
        return technologies;
    }
    getAssetType=(queryString)=>{
        let params = qs.parse(queryString);
        let assetType = params.assetType.split(",");
        return assetType;
    }

    updateQueryStringParameter=(uri, key, value)=> {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    getLanguage=(queryString)=>{
        let params = qs.parse(queryString);
        let lang = params.lang;
        return lang;

    }
    getAssetTopics=(queryString)=>{
        let params = qs.parse(queryString);
        let topics = params.assetTopics.split(",");
        return topics;
    }

    getTopics=(queryString)=>{
        let params = qs.parse(queryString);
        let topics = params.topics.split(",");
        return topics;
    }

    getAuthors=(queryString)=>{
        let params = qs.parse(queryString);
        let authors = params.authors.split(",");
        return authors;
    }
    getTechnologies=(queryString)=>{
        let params = qs.parse(queryString);
        let technologies = params.technologies.split(",");
        return technologies;
    }



    filterByDefaultLang = l => {
		if (this.state.defaultLanguages.length == 0) return true;

		for (let i = 0; i < this.state.defaultLanguages.length; i++) {
			if (l.lang?l.lang.includes(this.state.defaultLanguages[i]):"") return true;
		}
		return false;
	}

    filterByDefaultTags = l => {
		if (this.state.defaultTags.length == 0) return true;
		for (let i = 0; i < this.state.defaultTags.length; i++) {
			if (l.tags.map(t=>t).includes(this.state.defaultTags[i])) return true;
		}
		return false;
	}

     filterByDefaultAuthor = l => {
		if (this.state.defaultAuthor.length == 0) return true;
		for (let i = 0; i < this.state.defaultAuthor.length; i++) {
			if (l.authors == null) {
				return false;
			}
			if (l.authors.includes(this.state.defaultAuthor[i])) return true;
		}
		return false;
	}


	filterByLang = l => {
		if (this.state.selectedLanguages.length == 0) return true;
		for (let i = 0; i < this.state.selectedLanguages.length; i++) {
			if (l.lang?l.lang.includes(this.state.selectedLanguages[i].value):"") return true;
		}
		return false;
	}

    filterByTags = l => {
		if (this.state.selectedTags.length == 0) return true;
		for (let i = 0; i < this.state.selectedTags.length; i++) {
			if (l.tags.map(t=>t).includes(this.state.selectedTags[i].value)) return true;
		}
		return false;
	}
	filterByAuthors = l => {
		if (this.state.selectedAuthors.length == 0) return true;
		for (let i = 0; i < this.state.selectedAuthors.length; i++) {
			if (l.authors == null) {
				return false;
			}
			if (l.authors.includes(this.state.selectedAuthors[i].value)) return true;
		}
		return false;
	}
    replaceDraft = lessonLink =>{
            if(lessonLink){
                if (lessonLink.includes("[draft]")&&lessonLink.includes("/en/")){
                let newLink = lessonLink.replace("[draft]","");
                return newLink;
            }
            else{
                return lessonLink
            }
            }

    }
    filterByTech = asset => {
		if (this.state.selectedTechTags.length == 0) return true;
		for (let i = 0; i < this.state.selectedTechTags.length; i++) {
			if (asset.technologies.includes(this.state.selectedTechTags[i].value)) return true;
		}
		return false;
	}
    filterByTopic = asset => {
		if (this.state.selectedTopicTags.length == 0) return true;
		for (let i = 0; i < this.state.selectedTopicTags.length; i++) {
			if (asset.topics.includes(this.state.selectedTopicTags[i].value)) return true;
		}
		return false;
	}
    filterByType = asset => {
		if (this.state.selectedTypeTags.length == 0) return true;
		for (let i = 0; i < this.state.selectedTypeTags.length; i++) {
			if (asset.types!==null?asset.types.includes(this.state.selectedTypeTags[i].value):"") return true;
		}
		return false;
	}
    emojify= (tag) => emoji.emojify(tag, (name) => {
        if(name==='spiral_notepad') return "🗒";
        return name;
    });


	render() {


        const {location, pageContext} =this.props;

        const lessonData = (Array.isArray(pageContext.lessons)) ? pageContext.lessons : [];
        const assetsData = (Array.isArray(pageContext.assets)) ? pageContext.assets : [];

        const lessons =(<Context.Consumer>
					{({ store, actions }) => {

						return (

							<div className={`${this.state.displayLesson&&"d-none"}`}>
                                <Helmett
                                    title="BreatheCode | Lessons"
                                    description="the following lessons explain different programing concepts and have been published by BreatheCode members, use the filters bellow to narrow your search:"
                                    url="https://breatheco.de/lessons"
                                    image="https://ucarecdn.com/717ad4fe-f186-44aa-872a-dd04584e4da0/logobcode.png"
                                />
								<SmallJumbotron
									jumboClass="jumbotron jumbotron-fluid mb-0 bg-white"
									containerClass="pl-4  container"
									headerClass="headerSizeResponsive display-4  font-weight-bold  text-left"
									headerText="Lessons Published"
									pClass="lead  text-left"
									pContent="the following lessons explain different programing
										concepts and have been published by breathe code
										members, search for a partiulars lesson using the
										filters bellow"
                                    spanClass="h3 text-secondary"
                                    spanContent="md"
								/>
								<div className="rowFontSize row sticky-top bg-white border-top border-bottom fontSize">
									<div className="container">
										<div className="row">
											<div className="col-12  d-flex justify-content-start">
                                                <div className="px-1 py-2">
                                                    <div className="btn-group">
                                                        <a
                                                        onClick={() => {
                                                            this.setState({
                                                                changeLesson: !this.state.changeLesson,
                                                            });
                                                        }}

                                                        className="ml-2 text-secondary  dropdown-toggle postion-absolute pt-2 m-0 active"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        >
                                                            Lessons
                                                        </a>
                                                        <div className={`mt-3 dropdown-menu ${this.state.changeLesson&&"show"}`}>
                                                            <button
                                                                class="dropdown-item"
                                                                type="button"
                                                                onClick={() => {
                                                                this.setState({
                                                                    displayAssets: false,
                                                                    displayLesson:true,
                                                                    changeLesson:false,

                                                                });
                                                                }}
                                                            >
                                                            Assets
                                                            </button>
                                                            <button
                                                                class="dropdown-item"
                                                                type="button"
                                                                onClick={() => {
                                                                this.setState({
                                                                    displayLesson: false,
                                                                    displayAssets:true,
                                                                    changeLesson:false,
                                                                });
                                                                }}
                                                            >
                                                            Lessons
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
												<div className="px-1 py-2">
													<Filter
														label="Tags"
														placeholder="Filter by topic"
                                                        className="minWidth topicFilterPostion"
														onChange={d =>  {
                                                            this.setState({
																selectedTags: d
															});

                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"topics",d.map(o => o.value).join(',')) );
                                                        }}
															options={(() => {
                                                                if(Array.isArray(lessonData)){
                                                                    const lessonsTags = lessonData.map(l => l.tags);
                                                                    const tags = [].concat.apply([], lessonsTags)
                                                                    return actions.filterRepeated(tags.map(tag => this.emojify(tag))).map((tag, index) => {
                                                                        return {
                                                                            label: tag,
                                                                            value: tag
                                                                        };
                                                                    });
                                                                }
                                                                else{
														            return <Loading/>;
                                                                }
                                                            })()}
													/>
												</div>
                                                <div className="px-1 py-2">
													<Filter
														label="Language"
														placeholder="Filter by language"
                                                        defaultValue={this.state.defaultLanguages}
                                                        className="minWidth languageFilterPosition"
                                                        optionComponent={({ selected, onSelect, onDeselect, data }) =>
                                                        <li className={(selected) ? "selected" : ""} onClick={() => selected ? onDeselect(data) : onSelect(data)}>
                                                            { (data.value == "es") ?
                                                                <span>ES <img className="mb-1" style={flag} src="https://ucarecdn.com/6f04f93e-1971-4e14-b730-94fad8254693/-/resize/18x/"/></span>
                                                                :
                                                                <span>EN <img className="mb-1" style={flag} src="https://ucarecdn.com/ec2f5da2-1e3d-4a0c-886c-255417a1c529/-/resize/18x/"/></span>
                                                            }
                                                            { selected && <Icon type="times" />}
                                                        </li>}
                                                        multiselect={false}
														onChange={d =>  {
                                                            this.setState({
																selectedLanguages: d ? [d] : [],
                                                                defaultLanguages: ""
															});

                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"lang",d.value));

                                                        }}
														options={pageContext ? actions.filterRepeated(lessonData.map(l=>l.lang)).map((lan, index) => {
															return {
																label:  lan,
																value: lan
															};
														})
                                                        :
                                                        [{
                                                            label: <Loading/>,
                                                            value: null
                                                        }]}

													/>
												</div>
												<div className="px-1 pl-1 py-2">
													<Filter
														label="Author"
														placeholder="Filter by author"
                                                        className="authorFilterPosition"
														onChange=
                                                        {d =>  {
                                                            this.setState({
																selectedAuthors: d
															});
                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"authors",d.map(o => o.value).join(',')) );
                                                        }}
														options={[].concat.apply([],actions.filterRepeated(lessonData.map(l => l.authors))).map(author => {
															return {
																label: author,
																value: author
															};

														})}
														withToggler={false}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								{pageContext == null ? <Loading /> : lessonData
                                    .filter(this.filterByDefaultAuthor)
                                    .filter(this.filterByDefaultTags)
                                    .filter(this.filterByDefaultLang)
                                    .filter(this.filterByLang)
									.filter(this.filterByAuthors)
									.filter(this.filterByTags)
									.map((lesson, index) => {
										return (
											<div className="container" key={index}>
												<div className="row">
													<div className="col-12  py-2 pl-2">
														<div className="pl-3">
															<a
																target="_blank"
																className="h2 text-dark btn-default"
																href={this.replaceDraft(actions.lessonUrl(lesson))}>
																{lesson.title}
															</a>
															<div className={`row ${!lesson.authors&&"mb-2"}`}>
																{lesson.authors&&<div className="col py-2 text-dark">
																	{lesson.authors && "Contributors: "}
																	{lesson.authors && lesson.authors.map((a,k) => (<a
																		href={`https://github.com/${a}`}
																		target="_blank"
																		key={k}
																		className="author badge badge-pill badge-light mr-2">@{a}</a>))}
																</div>}
															</div>
															<p className="lead text-dark ">{lesson.subtitle}</p>
															<div className="row ">
                                                                <div className="col pl-1">
                                                                    <div
																			key={index}
																			className="author badge badge-pill badge-light mr-2 text-uppercase">
																			{lesson.lang} {lesson.lang=="es"?<span><img className="mb-1" style={flag} src="https://ucarecdn.com/6f04f93e-1971-4e14-b730-94fad8254693/-/resize/18x/"/></span>:<span><img className="mb-1" style={flag} src="https://ucarecdn.com/ec2f5da2-1e3d-4a0c-886c-255417a1c529/-/resize/18x/"/></span>}
                                                                    </div>
																{lesson.tags?lesson.tags.map((tag, index) => {
																	return (
																		<div
																			key={index}
																			className="author badge badge-pill badge-light mr-2">
																			{tag}
																		</div>
																	);
																}):""}
                                                                </div>
                                                                <a href={this.replaceDraft(actions.lessonUrl(lesson))}  className="btn btn-outline-primary ml-auto mr-3">Read lesson</a>
															</div>
														</div>
													</div>
												</div>
												<hr className="my-4 ml-2" />
											</div>
										);
									})}
							</div>
						);
					}}
				</Context.Consumer>);

        {/*assets*/}
        const aseets=(
            <Context.Consumer>
					{({ store, actions }) => {

						return (
							<div className={`${this.state.displayAssets&&"d-none"}`}>
								<SmallJumbotron
									jumboClass="jumbotron jumbotron-fluid mb-0 bg-white"
									containerClass="pl-4  container"
									headerClass=" headerSizeResponsive display-md-4 font-weight-bold  text-left"
									headerText="Assets"
									pClass="lead  text-left"
									spanClass="h3 text-secondary"
									spanContent="md"
								/>

								<div className="row border-top border-bottom sticky-top bg-white fontSize rowFontSize">
									<div className="container">
										<div className="row">
											<div className="col  d-flex justify-content-start">
                                                <div className="px-1 pl-1 py-2">
                                                    <div className="btn-group">
                                                        <a
                                                        onClick={() => {
                                                            this.setState({
                                                                changeAsset: !this.state.changeAsset
                                                            });
                                                        }}

                                                        className="ml-1 text-secondary  dropdown-toggle postion-absolute pt-2 m-0 active"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false">
                                                            Assets
                                                        </a>
                                                        <div className={`mt-3 dropdown-menu ${this.state.changeAsset&&"show"}`}>
                                                            <button
                                                                class="dropdown-item"
                                                                type="button"
                                                                onClick={() => {
                                                                this.setState({
                                                                    displayAssets: false,
                                                                    displayLesson:true,
                                                                    changeAsset:false,

                                                                });
                                                                }}
                                                            >
                                                            Assets
                                                            </button>
                                                            <button
                                                                class="dropdown-item"
                                                                type="button"
                                                                onClick={() => {
                                                                this.setState({
                                                                    displayLesson: false,
                                                                    displayAssets:true,
                                                                    changeAsset:false,
                                                                });
                                                                }}
                                                            >
                                                            Lessons
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
												<div className="px-1 pl-1 py-2">
													<Filter
													label="technology"

													placeholder="Filter By Technology"
													onChange={d =>  {
                                                            this.setState({
																selectedTechTags: d
															});

                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"technologies",d.map(o => o.value).join(',')) );
                                                        }}
													options={(() => {
                                                        if (assetsData){
                                                            const technologies = actions.filterRepeated(assetsData.map(a=>a.technologies));
                                                            const techs = [].concat.apply([],technologies);
                                                            return techs.map((tech)=>{
                                                                return{
                                                                        label: tech,
                                                                        value: tech
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            return [{
                                                                        label:"loading" ,
                                                                        value: "loading"
                                                                }];
                                                        }

                                                    })()}
												    />
												</div>
                                                <div className="px-1 pl-1 py-2">
													<Filter
													label="Topic"
													placeholder="Filter By Topic"
													onChange={d =>  {
                                                            this.setState({
																selectedTopicTags: d
															});

                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"assetTopics",d.map(o => o.value).join(',')) );
                                                        }}
													options={assetsData? [].concat.apply([],actions.filterRepeated(assetsData.map(a=>a.topics))).map((topic)=>{
                                                        return{
                                                                label: topic,
																value: topic
                                                        }
                                                    }):[{
                                                                label:"loading...",
																value: "loading..."
                                                        }]}
												    />
												</div>
                                                <div className="px-1 pl-1 py-2">
													<Filter
													label="Type"
													placeholder="Filter By Type"
													onChange={d =>  {
                                                            this.setState({
																selectedTypeTags: d
															});

                                                            if(d)navigate("/lessons" + this.updateQueryStringParameter(location.search,"assetType",d.map(o => o.value).join(',')) );
                                                        }}
													options={assetsData?[].concat.apply([],actions.filterRepeated(assetsData.map(a=>a.types))).map((type)=>{
                                                        return{
                                                                label: type,
																value: type
                                                        }
                                                        }):[{
                                                                label:"loading" ,
																value: "loading"
                                                        }]}
												    />
												</div>
											</div>
										</div>
									</div>
								</div>
                                  <div className="container">
                                 {assetsData?assetsData
                                 .filter(this.filterByDefaultType)
                                 .filter(this.filterByDefaultTopic)
                                 .filter(this.filterByDefaultTech)
                                 .filter(this.filterByTech)
                                 .filter(this.filterByTopic)
                                 .filter(this.filterByType).map((asset)=>{
                                                const imageStyles = {
                                                    backgroundImage: `url("${asset.preview}")`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                };
                                     return(
                                <div >
                                    <div className="pl-2">
                                        <div className="row  text-center text-md-left mt-2  p-2 paddingLeftZero">
                                            <div className="col-12 col-md-2 d-flex justify-content-center align-items-center divSize" style={imageStyles}>

                                            </div>
                                            <div className="col-12 col-md p-3">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div><a href={asset.url?asset.url:""} className=" h2 text-dark">{asset.title?asset.title:"missing title"}</a></div>
                                                        <p className="lead mt-3">Type: {asset.types}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-12 p-2 col-md">
                                                        {asset.technologies?asset.technologies.map((tech)=>{
                                                                return(
                                                                    <span className="author badge badge-pill badge-light mr-2"> {tech}</span>
                                                                )
                                                            }):" "}
                                                    </div>
                                                    <div className="col-12 col-md-3 d-flex justify-content-md-end">
                                                        <div className="row mx-auto">
                                                            <div className="col-12 d-flex align-items-end">
                                                                <Link to={"/asset/"+ asset.slug } className="btn btn-outline-primary buttonHeight  px-2 ">
                                                                    View more
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    </div>
                                     );
                                 }):<Loading/>}

                                </div>
							</div>
						);
					}}
				</Context.Consumer>
        );

		return (
            <Layout>
                <Navbar/>
                    {lessons}
                    {aseets}
                <Footer/>
            </Layout>

		);
	}
}

export default Store(Lessons)