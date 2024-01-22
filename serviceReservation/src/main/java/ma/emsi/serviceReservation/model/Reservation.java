package ma.emsi.serviceReservation.model;

import java.sql.Date;	

import jakarta.persistence.*;

@Entity
public class Reservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Date dateReservation;
	@Transient
	@ManyToOne
	private User user;
	private int userId;
	@Transient
	@ManyToOne
	private Chambre chambre;
	@Column(unique = true)
	private int chambreId;

	public Reservation() {
		super();
	}

	public Reservation(int id, Date dateReservation, User user, int userId, Chambre chambre, int chambreId) {
		super();
		this.id = id;
		this.dateReservation = dateReservation;
		this.user = user;
		this.userId = userId;
		this.chambre = chambre;
		this.chambreId = chambreId;
	}
	

	public Reservation(int id, User user, int userId, Chambre chambre, int chambreId) {
		super();
		this.id = id;
		this.user = user;
		this.userId = userId;
		this.chambre = chambre;
		this.chambreId = chambreId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Chambre getChambre() {
		return chambre;
	}

	public void setChambre(Chambre chambre) {
		this.chambre = chambre;
	}

	public int getChambreId() {
		return chambreId;
	}

	public void setChambreId(int chambreId) {
		this.chambreId = chambreId;
	}

	public Date getDateReservation() {
		return dateReservation;
	}

	public void setDateReservation(Date dateReservation) {
		this.dateReservation = dateReservation;
	}

	@Override
	public String toString() {
		return "Reservation [id=" + id + ", dateReservation=" + dateReservation + ", user=" + user + ", userId="
				+ userId + ", chambre=" + chambre + ", chambreId=" + chambreId + "]";
	}

}
