<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *    itemOperations={
 *      "GET" = {},
 *      "DELETE" = {
 *         "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas supprimer cette catégorie si vous êtez pas un admin."
 *        },
 *      "PUT" = {
 *          "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas modifier cette catégoriesi vous êtez pas un admin."
 *        }
 *    },
 *    collectionOperations={
 *       "GET"={},
 *       "POST"={
 *          "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas ajouter une nouvelle catégorie si vous êtez pas un admin."
 *        }
 *    },
 *    normalizationContext={"groups"={"category:read"}},
 *    denormalizationContext={"groups"={"category:write"}},
 *  
 * )
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"product:write", "product:read"}) 
     * @Groups({"category:read", "category:write", "products:read"})
     * @ApiProperty(iri="http://schema.org/id")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"product:write", "product:read"})
     * @Assert\NotBlank(message="le titre est oligatoire")
     * @Assert\Length(min=4, minMessage="le titre doit avoir 4 caractères au minimum .")
     * @Groups({"product:read"})
     * @Groups({"product-comment:read"}) 
     * @Groups({"category:read", "category:write", "products:read"})
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product:write", "product:read"})
     * @Groups({"product-comment:read"}) 
     * @Groups({"category:read", "category:write"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="category")
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }
}
