import React from "react";
import placeholderUrl from "./placeholder.svg";
import { ReactComponent as Edit } from "./edit.svg";

export default class ImageUpload extends React.Component {
  /**
   * Use media upload:
   * https://wordpress.stackexchange.com/questions/235406/how-do-i-select-an-image-from-media-library-in-my-plugin
   */

  state = {
    src: null,
  };

  componentDidMount() {
    this.setState((prevState) => ({
      src: this.props.image
        ? this.props.image
        : pluginAppDirPath + placeholderUrl,
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
      <div className="relative h-full">
        <img
          className="object-contain h-full w-full border-none"
          src={this.state.src}
        />

        <button
          className="absolute xy-align text-white flex justify-center items-center p-4 opacity-75 bg-gray-900 cursor-pointer focus:outline-none border-none rounded-full outline-none hover:opacity-100"
          onClick={this.uploadReplaceMedia}
        >
          <Edit className="w-4 h-4 xy-align" />
        </button>
      </div>
    );
  }
}
