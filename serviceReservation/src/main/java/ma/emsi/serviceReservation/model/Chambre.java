package ma.emsi.serviceReservation.model;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class Chambre {
	private int id;
	private String label;
	private boolean dispo;
	@ManyToOne
	private Hotel hotel;

	public Chambre() {
		super();
	}

	public Chambre(int id, String label, boolean dispo, Hotel hotel) {
		super();
		this.id = id;
		this.label = label;
		this.dispo = dispo;
		this.hotel = hotel;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public boolean isDispo() {
		return dispo;
	}

	public void setDispo(boolean dispo) {
		this.dispo = dispo;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	@Override
	public String toString() {
		return "Chambre [id=" + id + ", label=" + label + ", dispo=" + dispo + ", hotel=" + hotel + "]";
	}

}
