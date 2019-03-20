/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';

class Image extends React.PureComponent {
   render() {
      return (
          <div><img {...this.props} /><br /></div>

      )
   }
}
export default Image