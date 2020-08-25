import React from "react";

export default class ImageUpload extends React.Component {
  /**
   * Use media upload:
   * https://wordpress.stackexchange.com/questions/235406/how-do-i-select-an-image-from-media-library-in-my-plugin
   */

  state = { src: null };
  componentDidMount() {
    this.setState((prevState) => ({
      src: this.props.image,
    }));
  }
  uploadReplaceMedia = () => {
    var image_frame;
    let that = this;
    if (image_frame) {
      image_frame.open();
    }
    // Define image_frame as wp.media object
    image_frame = wp.media({
      title: "Select Media",
      multiple: false,
      library: {
        type: "image",
      },
    });

    image_frame.on("close", function () {
      // On close, get selections and save to the hidden input
      // plus other AJAX stuff to refresh the image preview
      var selection = image_frame.state().get("selection");
      var gallery_ids = new Array();
      var my_index = 0;
      selection.each(function (attachment) {
        gallery_ids[my_index] = attachment["id"];
        my_index++;
      });
      var ids = gallery_ids.join(",");
      // jQuery("input#myprefix_image_id").val(ids);
      if (ids) {
        that.Refresh_Image(ids);
      }
    });

    image_frame.on("open", function () {
      // On open, get the id from the hidden input
      // and select the appropiate images in the media manager
      // var selection = image_frame.state().get("selection");
      // var ids = jQuery("input#myprefix_image_id").val().split(",");
      // ids.forEach(function (id) {
      //   var attachment = wp.media.attachment(id);
      //   attachment.fetch();
      //   selection.add(attachment ? [attachment] : []);
      // });
    });

    image_frame.open();
  };

  // Ajax request to refresh the image preview
  Refresh_Image = (the_id) => {
    let that = this;
    var data = {
      action: "howto_get_image",
      id: the_id,
    };

    jQuery.get(ajaxurl, data, function (response) {
      if (response.success === true) {
        that.setState((prevState) => ({
          src: response.data.image,
        }));
        that.props.onImageChangeHandler(response.data.image);
      }
    });
  };

  render() {
    return (
      <div className="relative group">
        {/* <input
          type="hidden"
          name="myprefix_image_id"
          id="myprefix_image_id"
          value="<?php echo esc_attr( $image_id ); ?>"
          className="regular-text"
        />
        <input
          type="button"
          className="button-primary"
          value="Select Image"
          id="myprefix_media_manager"
        /> */}
        <img className="w-56" src={this.state.src} />
        <div
          className="w-full h-full absolute top-0 left-0 text-white flex justify-center items-center opacity-0 bg-gray-900 cursor-pointer group-hover:opacity-75"
          onClick={this.uploadReplaceMedia}
        >
          Change Me
        </div>
      </div>
    );
  }
}
