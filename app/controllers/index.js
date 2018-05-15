import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  likes: 0,
  photographer: null,
  photoUrl: 'http://placehold.it/200x200',
  photoArray: [],
  currentPage: 1,
  showButton: true,

  unsplash: service(),

  init() {
    this._super(...arguments);
    this.send('getPhotos');
  },

  actions: {
    async getPhotos() {
      let photoArray = get(this, 'photoArray');
      let json = await get(this, 'unsplash').getPhotos(this.currentPage);

      $.map(json, function(item) {
        let photoUrl = item.urls.regular;
        let { likes, user } = item;
        photoArray.pushObject({
          likes: likes,
          photoUrl: photoUrl,
          photographer: user,
        });
      });

      set(this, 'currentPage', this.currentPage + 1);
      if(this.currentPage > 2) {
        set(this, 'showButton', false);
      }
    }
  }
});
