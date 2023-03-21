import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit {

 
  geoJson: {};

  

  constructor() { } 
 

  ngOnInit() {


    
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9ycmlzdmlqYXkiLCJhIjoiY2xlM3kzNmd1MGFmbDN1c2FhaWhsa2owOSJ9.0BUo1HjWhmMCDYTMAY6z7g';

    this.geoJson = {
      "type": "FeatureCollection",
      "features": [
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000095438", "name": "SIVAKUMAR" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 80.215652, 13.010236 ] } 
        },
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000224544", "name": "KARTHIKEYAN" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 151.212, -33.8846 ] } 
        },
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000000336", "name": "GOKULAKANNAN" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 80.0707, 12.8503 ] } 
        },
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000000075", "name": "VIJAY" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 80.215652, 13.010236 ] } 
        },
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000224544", "name": "KARTHIKEYAN" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 80.215652, 13.010236 ] } 
        },
        { 
          "type": "Feature",
          "properties": { "id": "TFNI10000000336", "name": "GOKULAKANNAN" ,"img": "./assets/img/girle.jpg"}, 
          "geometry": { "type": "Point", "coordinates": [ 80.215652, 13.010236 ] } 
        }
      ]
    };
    
    
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [80.215652, 13.010236],
      zoom: 2,
      attributionControl: false
  });
   map.on('load', () => { 
      map.addSource('earthquakes', {
          type: 'geojson', 
          data: this.geoJson,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#51bbd6',
                  100,
                  '#f1f075',
                  750,
                  '#f28cb1'
              ],
              'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  20,
                  100,
                  30,
                  750,
                  40
              ]
          }
      });

      map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          layout: {
              'text-field': ['get', 'point_count_abbreviated'],
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
          }
      });

      map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'earthquakes',
          filter: ['!', ['has', 'point_count']],
          paint: {
              'circle-color': '#11b4da',
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
          }
      });

      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
              layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource('earthquakes').getClusterExpansionZoom(
              clusterId,
              (err, zoom) => {
                  if (err) return;

                  map.easeTo({
                      center: features[0].geometry.coordinates,
                      zoom: zoom
                  });
              }
          );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.

      
      map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice(); 
 
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        if(e.features.length/2 > 1){
            var popupHtml = '<div style="max-height:120px;overflow-y: scroll;">'
        }else{
            var popupHtml = '<div>'
        }
 
        
          for (var i = 0; i < e.features.length/2; i++) {
            // popupHtml += '<img src=' + e.features[i].properties.img + '  class="img-circle user-img-circle" alt="User Image" style="width:70px; height:70px;"/>'+
            // '<p>' + '<b>' + 'Talent ID :' + '</b>' +e.features[i].properties.id   +'<br>' + 
            // '<b>' + 'Name :' + '</b>' + e.features[i].properties.name  +'</p>'

            popupHtml += '<table style="margin-bottom: 5px;"><tr><td rowspan="3"><img src=' + e.features[i].properties.img + '  class="img-circle" alt="User Image" style="width:70px; height:70px;"/></td>' +
            '<td style="white-space: nowrap;">' +e.features[i].properties.id   + '</td><td>&ensp;</td></tr>'+
            '<tr>' + '<td>' + e.features[i].properties.name  +'</td><td>&ensp;</td></tr>'+
            '<tr>' + '<td>' + e.features[i].properties.connection  +'</td><td>&ensp;</td></tr> </table>'
          }
          popupHtml += '</div>'
           new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(popupHtml)
              .addTo(map);
    });

      map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = '';
      });
  });
  }


}
