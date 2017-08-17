import React from 'react'
import SearchComponent from './components/search'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as usersAction from '../../store/actions/user'
import * as searchResultsAction from '../../store/actions/search-results'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onClickItemListHandler = this.onClickItemListHandler.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
  }

  componentDidMount() {
    this.props.updateGroups(this.props.vkInfo.viewerId);
  }

  onClickItemListHandler(i) {
    this.props.markGroup(i);
  }

  onSubmitHandle(values) {
    const city = values.city ? values.city.value : null;
    const accessToken = this.props.vkInfo.accessToken;

    if(values.deepSearch) {
      this.props.deepSearchInGroups({...values, city, accessToken});
    } else {
      this.props.searchUsersInGroups({...values, city, accessToken});
    }

    this.props.router.push('/search/search-results');
  }

  render() {
    const {
      props: {groups, children},
      onClickItemListHandler,
      onSubmitHandle
    } = this;

    return (
      <div>
        {children ? children :
          <SearchComponent groups={groups}
                          onClickItemListHandler={onClickItemListHandler}
                          onClickItemHeaderListHandler={onClickItemListHandler}
                          onSubmitHandle={onSubmitHandle}/> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vkInfo: state.user.vkInfo,
  groups: state.user.groups
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersAction, dispatch),
  ...bindActionCreators(searchResultsAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)